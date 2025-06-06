# Generated by Django 4.2.10 on 2024-09-15 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AdminLogin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('UserName', models.CharField(max_length=50)),
                ('Password', models.CharField(max_length=20)),
                ('Date', models.DateField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GuestLogin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('MobileNumber', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Login',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('WhoAreYou', models.CharField(max_length=30)),
                ('Department', models.CharField(max_length=30)),
                ('MobileNumber', models.PositiveIntegerField(default=1234567890)),
            ],
        ),
        migrations.CreateModel(
            name='QueryForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('MobileNumber', models.PositiveIntegerField()),
                ('Department', models.CharField(max_length=30)),
                ('Date', models.DateField(auto_now_add=True, null=True)),
                ('Venue', models.CharField(max_length=20)),
                ('Floor', models.CharField(max_length=20)),
                ('RoomNo', models.CharField(max_length=20)),
                ('Complaint', models.CharField(max_length=200)),
                ('Status', models.CharField(default='NOT SEEN YET', max_length=15)),
                ('Remark', models.CharField(default='-', max_length=200)),
            ],
        ),
    ]
