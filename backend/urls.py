from django.urls import path
from . import views

urlpatterns = [
    path('calendar', views.CalendarApi.as_view()),
    path('category', views.CategoryApi.as_view()),
    path('income-expense', views.IncomeExpenseApi.as_view()),
]
