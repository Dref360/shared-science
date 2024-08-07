from sqlmodel import Session, select

from kharon.models import User


def user_exists(email: str, session: Session):
    return session.exec(select(User).where(User.email == email)).first() is not None
