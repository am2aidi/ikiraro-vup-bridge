"""
Vercel API Handler
Directs to root WSGI app
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app as handler

app = handler
