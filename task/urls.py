from django.urls import path
from . import views

app_name = 'tasks'

urlpatterns = [
    path('', views.TaskList.as_view(), name='task_list_url'),
    path('<str:id>/completed/', views.TaskComplete.as_view(), name='task_completed_url' ),
    path('<str:id>/delete/', views.TaskDelete.as_view(), name='task_delete_url' ),
]
