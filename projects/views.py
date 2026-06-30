from django.shortcuts import render
from .models import Project

def home(request):
    # Fetch only the projects you marked as published
    projects = Project.objects.filter(is_published=True)
    
    # Pass the projects into the context dictionary for the HTML template
    context = {
        'projects': projects
    }
    return render(request, 'projects/home.html', context)