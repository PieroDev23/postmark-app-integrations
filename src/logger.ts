

export async function log(level: 'INFO' | 'ERROR' | 'SUCCESS', content: string | Error, data: any) {
    console.log(JSON.stringify({
        _loglevel: level,
        content,
        data
    }))
}