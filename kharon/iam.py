import re

from kharon.models.model_utils import ResourceSQLModel


def has_access_to_resource(email, resource: ResourceSQLModel):
    """Naive implementation of read-access IAM.

    Notes:
        Using something like casbin could be beneficial here.
    """
    return re.search(rf"(^|,){email}(,|$)", resource.user_read_allow) is not None
