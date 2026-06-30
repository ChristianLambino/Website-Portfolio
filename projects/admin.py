from django.contrib import admin
from .models import Technology, Project, Experience, ContactMessage

# Registering models with basic configurations
admin.site.register(Technology)
admin.site.register(Experience)
admin.site.register(ContactMessage)

# Adding a custom Admin class for Projects to make the dashboard cleaner
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'created_at')
    list_filter = ('is_published', 'technologies')
    prepopulated_fields = {"slug": ("title",)} # Auto-generates the URL slug as you type the title