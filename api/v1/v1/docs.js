// api/v1/docs.js

export default function handler(req, res) {

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.status(200).json({

        service:
            'MRStore Stock API',

        version:
            '1.0.0',

        base_url:
            'https://stok.japir.my.id/api/v1/stock',

        authentication: {

            type: 'query',

            parameter: 'api_key'

        },

        endpoints: [

            '/api/v1/stock',
            '/api/v1/stock?type=xla',
            '/api/v1/stock?type=xda',
            '/api/v1/stock?code=XLA89',

            '/api/v1/status',
            '/api/v1/docs'

        ]

    });

}
