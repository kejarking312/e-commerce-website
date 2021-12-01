from django.db import models

# Create your models here.


class Order(models.Model):
    status = models.CharField(max_length=100)
    quantity = models.IntegerField()
    color = models.CharField(max_length=100)

    def __str__(self):
        return "Order:" + self.name
