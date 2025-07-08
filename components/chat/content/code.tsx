export const python_code = `
import mimetypes
from .models import *
from rest_framework import serializers
from auths.serializers import CustomUserSerializer, CustomUser
import base64
import imghdr
import uuid
from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model
from django.db import transaction
from .service import DebugHubService
from rest_framework.exceptions import ValidationError
User = get_user_model()

class ConsultSerializer(serializers.ModelSerializer):
    consult = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    consult_applicator = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all()
    )

    class Meta:
        model = ConsultSession
        fields = [
            "id",
            "session_id",
            "consult",
            "consult_applicator",
            "status",
            "close_at",
            "mode",
            "price",
            "discount",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["consult"] = CustomUserSerializer(instance.consult).data
        representation["consult_applicator"] = CustomUserSerializer(
            instance.consult_applicator
        ).data
        return representation





class Base64FileField(serializers.FileField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith("data:"):
            # Extract MIME type and Base64 data
            header, data = data.split(";base64,")
            mime_type = header.split(":")[1]
            extension = mimetypes.guess_extension(mime_type) or "bin"
            file_name = f"{uuid.uuid4()}{extension}"
            decoded_file = base64.b64decode(data)
            return ContentFile(decoded_file, name=file_name)
        return super().to_internal_value(data)

class DebuggerSerializer(serializers.ModelSerializer,DebugHubService):
    debuger = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    debuger_applicator = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    file = Base64FileField()
    class Meta:
        model = DebugSession
        fields = [
            "id",
            "session_id",
            "debuger",
            "debuger_applicator",
            "status",
            "start_at",
            "close_at",
            "description",
            "file",
            "price",
            "discount",
            "mode",
            "time",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["debuger"] = CustomUserSerializer(instance.debuger).data
        representation["debuger_applicator"] = CustomUserSerializer(
            instance.debuger_applicator
        ).data
        return representation
   
    def update(self, instance, validated_data):
        session_id = validated_data.pop("session_id")
        message,result = self.AcceptSession(session_id)
        if not result:
            raise ValidationError({"success": False, "message": message})
        return super().update(instance, validated_data)


`