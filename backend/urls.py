from django.urls import path
from . import views

urlpatterns = [
    path('day-names', views.DayNames.as_view()),
]
