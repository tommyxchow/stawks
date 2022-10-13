# STAWKS

![Screenshot](https://user-images.githubusercontent.com/54859075/195729432-ffddb917-e06b-47bd-af28-d9d07beaaa04.png)

A web app that renders price history charts, details, and news for stocks. Only supports entering stock tickers due to limitations with the IEX Cloud API.

Built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [SWR](https://swr.vercel.app/)
- [Vercel](https://vercel.com/)

Check out the live demo at [stawks.vercel.app](https://stawks.vercel.app)!

## Setup

You'll first have to register for an account on [IEX Cloud](https://iexcloud.io/) to obtain an API token. Then, set the token as the `IEX_TOKEN` [environment variable](https://nextjs.org/docs/basic-features/environment-variables).

You can refer to the [IEX Cloud API documentation](https://iexcloud.io/docs/api/) for more details.

## Notes

STAWKS utilizes [incremental static regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) from Next.js to statically generate stock pages while also keeping data up to date, resulting in excellent performance. The homepage is revalidated every 30 minutes while the stock page is revalidated every minute.

## License

STAWKS is licensed under [MIT](LICENSE).
