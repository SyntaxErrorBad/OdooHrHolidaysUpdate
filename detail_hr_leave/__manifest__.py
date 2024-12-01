{
    'name': 'Detail Hr Leave',
    'author': 'NN',
    'license': 'OPL-1',
    'images': [],
    'version': '17.0.0.0.1',
    'depends': ['hr_holidays'],
    'data': [
        'views/hr_leave_views.xml'
    ],

    'assets': {
        'web.assets_backend': [
            'detail_hr_leave/static/src/**/*'
        ],
    },

    'installable': True,
    'auto_install': False,
}
