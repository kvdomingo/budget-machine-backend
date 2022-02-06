from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=32, unique=True)
    color = models.CharField(max_length=7)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


class IncomeExpense(models.Model):
    INCOME_EXPENSE_CHOICES = [
        ("I", "Income"),
        ("E", "Expense"),
    ]

    type = models.CharField(max_length=1, choices=INCOME_EXPENSE_CHOICES)
    description = models.CharField(max_length=32)
    amount = models.DecimalField(decimal_places=2, max_digits=8)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        default=None,
        to_field="name",
        related_name="expenses",
    )
    date = models.DateField()

    class Meta:
        ordering = ["-type", "-date"]
        verbose_name = "income/expense"
        verbose_name_plural = "incomes/expenses"

    def __str__(self):
        return f"[{dict(self.INCOME_EXPENSE_CHOICES)[self.type].upper()}] {self.description} ({self.amount:.2f})"
