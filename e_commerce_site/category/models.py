from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50)
    # products = models.ForeignKey(
    #     'products.Product', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
