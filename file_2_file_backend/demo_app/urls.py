from django.urls import path
from .views import *

urlpatterns = [
    path('appoutline/', AppOutline.as_view()),
    path('filefetch/', FileFetch.as_view()),
]