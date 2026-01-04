import time
import uuid
import base64
import requests
from typing import Optional

from app.api.config import GIGA_CLIENT_ID, GIGA_CLIENT_SECRET


class GigaChatClient:
    AUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
    CHAT_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"

    def __init__(self) -> None:
        self._session = requests.Session()
        self._access_token: Optional[str] = None
        self._expires_at: float = 0.0

        auth_str = f"{GIGA_CLIENT_ID}:{GIGA_CLIENT_SECRET}"
        self._basic_auth = base64.b64encode(auth_str.encode()).decode()

    
    def _token_is_valid(self) -> bool:
        # upd. for 60 sec until expire
        return self._access_token is not None and time.time() < self._expires_at - 60
    
    def _get_token(self) -> str:
        headers = {
            "Authorization": f"Basic {self._basic_auth}",
            "RqUID": str(uuid.uuid4()),
            "Content-Type": "application/x-www-form-urlencoded",
        }
        data = {"scope": "GIGACHAT_API_PERS"}

        response = self._session.post(
            self.AUTH_URL,
            headers=headers,
            data=data,
            timeout=10,
            verify=False,
        )
        response.raise_for_status()

        payload = response.json()
        self._access_token = payload["access_token"]
        self._expires_at = time.time() + payload.get("expires_in", 0)

        return self._access_token
    
    def _ensure_token(self) -> str:
        if not self._token_is_valid():
            return self._get_token()
        return self._access_token


    # API

    def send_message(self, message: str) -> dict:
        token = self._ensure_token()

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": "GigaChat",
            "messages": [
                {"role": "user", "content": message}
            ],
        }

        response = self._session.post(
            self.CHAT_URL,
            headers=headers,
            json=payload,
            timeout=30,
            verify=False,
        )

        if response.status_code == 401:
            token = self._get_token()
            headers["Authorization"] = f"Bearer {token}"
            response = self._session.post(
                self.CHAT_URL,
                headers=headers,
                json=payload,
                timeout=30,
                verify=True,
            )
        
        response.raise_for_status()
        return response.json()
