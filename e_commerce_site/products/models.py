from django.db import models
from django.conf import settings
from django.shortcuts import reverse

SIZES = (
    ('L', 'Large'),
    ('M', 'Medium'),
    ('S', 'Small'),
    ('WL', '12'),
    ('WM', '10'),
    ('WS', '8'),
    ('4', 'Size 4'),
    ('5', 'Size 5'),
    ('6', 'Size 6'),
    ('7', 'Size 7'),
    ('8', 'Size 8'),
    ('9', 'Size 9'),
    ('10', 'Size 10'),
    ('11', 'Size 11'),
)

LABEL = (
    ('N', 'New'),
    ('BS', 'Best Seller'),
    ('S', 'Sale Item'),
)


class Product(models.Model):
    brand = models.CharField(max_length=100)
    product_model = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=100)
    colour = models.CharField(max_length=100)
    size = models.CharField(choices=SIZES, max_length=2)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    discount_price = models.DecimalField(
        decimal_places=2, max_digits=5, blank=True, null=True)
    label = models.CharField(choices=LABEL, max_length=2)
    categorys = models.ForeignKey(
        "category.Category", on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, blank=True)
    description = models.CharField(
        max_length=250, default='', blank=True, null=True)
    image_1 = models.CharField(max_length=300)
    image_2 = models.CharField(max_length=300)
    image_3 = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.brand} {self.type}"

    def get_absolute_url(self):
        return reverse("e_commerce_site:product", kwargs={
            "pk": self.pk

        })

    def get_add_to_cart_url(self):
        return reverse("e_commerce_site:add-to-cart", kwargs={
            "pk": self.pk
        })

    def get_remove_from_cart_url(self):
        return reverse("e_commerce_:remove-from-cart", kwargs={
            "pk": self.pk
        })


class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product}"


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateField(auto_now_add=True)
    ordered_date = models.DateField(auto_now_add=True)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
