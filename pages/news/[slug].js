import Link from 'next/link'
import { useEffect, useState } from 'react';


function getTimeDiff(updatedAt) {
    return Math.floor((Date.now() - updatedAt)/1000)
}

export default function NewsPage({slug, updatedAt}) {
    const [timeDiff, setTimeDiff] = useState(getTimeDiff(updatedAt))
    const timeString = new Date(updatedAt).toLocaleTimeString();

    const reloadNow = (e) => {
        e.preventDefault();
        location.reload();
    }

    useEffect(() => {
        const handler = setInterval(() => {
            setTimeDiff(getTimeDiff(updatedAt))
        }, 100);

        return () => clearInterval(handler)
    }, [])

    return (
         <div className="container">
            <h1>News: {slug}</h1>
            <p>This is a news about: {slug}</p>
            <div className="meta">
                Updated at <span className="time">{timeString}</span> ({timeDiff}s ago.)
            </div>
            <div>
                <Link href="/"><a>Home</a></Link>
            </div>
            <div className="learn-more">
                <a href="https://arunoda.me/blog/what-is-nextjs-issg">What is Next.js iSSG?</a>
            </div>
            <style jsx>{`
                .container {
                    font-family: Arial;
                    margin: 50px 30px;
                }

                a {
                    text-decoration: none;
                }

                .meta {
                    margin: 25px 0 15px 0;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #DDD;
                    font-size: 13px;
                }

                .time {
                    font-weight: bold;
                }

                .learn-more {
                    position: fixed;
                    bottom: 0px;
                    padding: 30px 0;
                    font-size: 14px;
                }
            `}</style>
        </div>
    )
}

NewsPage.getInitialProps = async ({query}) => {
    return {
        slug: query.slug,
        updatedAt: Date.now()
    }
};
