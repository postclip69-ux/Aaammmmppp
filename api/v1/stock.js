// api/v1/stock.js

const VALID_API_KEYS = [
    'bZEtaXoXJ5FPWthoSxFBnQcxJJ6NcaeW'
];

export default async function handler(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=30, stale-while-revalidate=60'
    );

    const {
        api_key,
        type,
        code
    } = req.query;

    if (!api_key) {

        return res.status(401).json({
            ok: false,
            message: 'API Key wajib diisi'
        });

    }

    if (!VALID_API_KEYS.includes(api_key)) {

        return res.status(403).json({
            ok: false,
            message: 'API Key tidak valid'
        });

    }

    try {

        const protocol =
            req.headers['x-forwarded-proto'] || 'https';

        const host =
            req.headers.host;

        const response =
            await fetch(
                `${protocol}://${host}/api/proxy`
            );

        const data =
            await response.json();

        let result = {
            xla: data.xla,
            xda: data.xda
        };

        // ======================
        // FILTER TYPE
        // ======================

        if (type === 'xla') {

            result = data.xla;

        }

        if (type === 'xda') {

            result = data.xda;

        }

        // ======================
        // FILTER CODE
        // ======================

        if (code) {

            const product = [
                ...data.xla,
                ...data.xda
            ].find(item => {

                return (
                    item.type === code ||
                    item.nama === code
                );

            });

            return res.status(200).json({

                ok: true,

                version: '1.0.0',

                author: 'MRStore',

                timestamp:
                    new Date().toISOString(),

                data:
                    product || null

            });

        }

        return res.status(200).json({

            ok: true,

            version: '1.0.0',

            author: 'MRStore',

            timestamp:
                new Date().toISOString(),

            data: result

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            ok: false,

            message:
                'Internal Server Error'

        });

    }

}
