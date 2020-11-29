from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=32, unique=True)
    color = models.CharField(max_length=16)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class IncomeExpense(models.Model):
    INCOME_EXPENSE_CHOICES = [
        ('I', 'Income'),
        ('E', 'Expense'),
    ]

    type = models.CharField(max_length=1, choices=INCOME_EXPENSE_CHOICES)
    description = models.CharField(max_length=32)
    amount = models.FloatField()
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        to_field='name',
        related_name='expenses',
    )
    date = models.DateField()

    class Meta:
        ordering = ['-date']
        verbose_name = 'income/expense'
        verbose_name_plural = 'incomes/expenses'

    def __str__(self):
        return f'{self.description} ({self.amount})'
