import calendar
from datetime import datetime
from .calendar import MONTH
from .serializers import *
from rest_framework import permissions, status
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
            'month': MONTH,
            'year': now.year,
        }
        return Response(response)


class CategoryApi(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        categories = Category.objects.all().order_by('name')
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        data = Category.objects.get(pk=request.data['id']).delete()
        return Response(data)


class IncomeExpenseApi(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        data = IncomeExpense.objects.all().order_by('-date')
        serializer = IncomeExpenseSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = IncomeExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        data = IncomeExpense.objects.get(pk=request.data['id']).delete()
        return Response(data)
