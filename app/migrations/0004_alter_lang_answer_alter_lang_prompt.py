# Generated by Django 4.1.7 on 2023-05-23 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_lang_answer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lang',
            name='answer',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='lang',
            name='prompt',
            field=models.TextField(max_length=200),
        ),
    ]