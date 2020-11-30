import calendar
from datetime import datetime
from .serializers import *
from rest_framework import permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView


class CalendarApi(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        now = datetime.now()
        response = {
            'dayNames': list(calendar.day_name),
            'monthNames': list(calendar.month_name),
            'monthIndex': now.month,
            'month': calendar.monthcalendar(now.year, now.month),
            'year': now.year,
        }
        return Response(response)


class CategoryApi(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class IncomeExpenseApi(generics.ListAPIView):
    queryset = IncomeExpense.objects.all()
    serializer_class = IncomeExpenseSerializer
    filterset_fields = ['type', 'date', 'category']
