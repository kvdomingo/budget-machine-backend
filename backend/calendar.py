import calendar
from datetime import datetime


_now = datetime.now()

MONTH = calendar.monthcalendar(_now.year, _now.month)

for _i, _week in enumerate(MONTH):
    for _j, _day in enumerate(_week):
        MONTH[_i][_j] = dict(
            day=_day,
            fullDate=f'{_now.strftime("%Y-%m")}-{_day:02}',
            today=(_now.day == _day),
        )
