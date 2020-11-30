from .models import *
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class IncomeExpenseSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    def get_type(self, obj):
        return dict(obj.INCOME_EXPENSE_CHOICES)[obj.type]

    class Meta:
        model = IncomeExpense
        fields = '__all__'
