import calendar
from datetime import datetime
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class CalendarInfo(APIView):
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
