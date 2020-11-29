from django.contrib import admin
from .models import *


admin.site.register(Category)
admin.site.register(IncomeExpense)

admin.site.index_title = 'Admin'
admin.site.site_title = 'Budget Machine'
admin.site.site_header = 'Budget Machine administration'
