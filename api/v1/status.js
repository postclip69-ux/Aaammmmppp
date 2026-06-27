// api/v1/status.js

export default function handler(req, res) {

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.status(200).json({

        ok: true,

        service:
            'MRStore Stock API',

        version:
            '1.0.0',

        status:
            'online',

        timestamp:
            new Date().toISOString()

    });

}
