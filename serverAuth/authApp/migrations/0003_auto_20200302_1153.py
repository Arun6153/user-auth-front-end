# Generated by Django 3.0.3 on 2020-03-02 06:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0002_auto_20200301_1729'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='option',
            new_name='optionPerm',
        ),
    ]
