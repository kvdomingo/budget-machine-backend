# Generated by Django 3.1.3 on 2020-11-30 11:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20201129_1654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incomeexpense',
            name='category',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expenses', to='backend.category', to_field='name'),
        ),
    ]
