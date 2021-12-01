from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    colour = models.CharField(max_length=100)
    size = models.CharField(max_length=20)
    price = models.IntegerField()

    def __str__(self):
        return "Product" + self.name
