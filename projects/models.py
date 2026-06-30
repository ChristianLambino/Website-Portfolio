from django.db import models

class Technology(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, max_length=50)
    color = models.CharField(
        max_length=7, 
        help_text="Hex color code for frontend tags, e.g., #FF5733"
    )

    class Meta:
        verbose_name_plural = "Technologies"
        ordering = ['name']

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)
    summary = models.CharField(max_length=200, help_text="Short hook for the project card.")
    description = models.TextField(help_text="Full case study. Supports Markdown/HTML.")
    technologies = models.ManyToManyField(Technology, related_name='projects')
    thumbnail = models.ImageField(upload_to='projects/thumbnails/')
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Puts the newest projects at the top of your queries by default
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Experience(models.Model):
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    achievements = models.TextField(help_text="Enter bullet points as Markdown or HTML.")

    class Meta:
        verbose_name_plural = "Experiences"
        # Sorts by most recent job first
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Puts unread/newest messages at the top of your inbox
        ordering = ['-submitted_at']

    def __str__(self):
        status = "Read" if self.is_read else "Unread"
        return f"[{status}] Message from {self.name}"