from django.urls import path
from . import views

urlpatterns = [
    path('calendar', views.CalendarInfo.as_view()),
]
