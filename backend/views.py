import calendar
from datetime import datetime
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class DayNames(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        now = datetime.now()
        html_cal = calendar.HTMLCalendar()
        response = html_cal.formatmonth(now.year, now.month)
        return Response(response)
