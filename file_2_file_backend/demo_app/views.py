from django.shortcuts import render
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .serializer import FileSerializer

FILES_REQUIRED = ['FileA', 'FileB']
ACTION = 'match'

class AppOutline(APIView):

    def get(self, request):
        return Response({
            'files_required': FILES_REQUIRED,
            'action_required': ACTION
        })

class FileFetch(APIView):
    parser_classes = [MultiPartParser,]
    
    def post(self, request):
        
        for key in FILES_REQUIRED:        
            try:        
                f = request.FILES[key]
                default_storage.save('tmp/{0}'.format(f.name), f)
            except Exception:
                response = Response({
                'data': 'file {0} is not found'.format(key)
                })
                return response
        return Response({
            'data': 'ok'
        })