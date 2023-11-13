# [STAWKS](https://stawks.vercel.app/)

![Screenshot](https://user-images.githubusercontent.com/54859075/195729432-ffddb917-e06b-47bd-af28-d9d07beaaa04.png)

A web app that renders price history charts, details, and news for stocks. Only supports entering stock tickers due to limitations with the IEX Cloud API.

## Background

When I took my first intro to CS course back in 2019, the final project I worked on was a really basic stock web app ([here](https://github.com/tommyxchow/stock-chart-visualizer)). I've learned a lot since, so I decided to make a remake/remaster of it! I rebuilt the project using the same API but with a more modern stack and overall nicer design.

## Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [SWR](https://swr.vercel.app/)
- [Vercel](https://vercel.com/)

## Setup

You'll first have to register for an account on [IEX Cloud](https://iexcloud.io/) to obtain an API token. Then, set the token as the `IEX_TOKEN` [environment variable](https://nextjs.org/docs/basic-features/environment-variables).

You can refer to the [IEX Cloud API documentation](https://iexcloud.io/docs/api/) for more details.

## Notes

The IEX Cloud API is now pretty limited on the free tier, so the website displays fallback data to maintain interactivity.

STAWKS utilizes [incremental static regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) from Next.js to statically generate stock pages while also keeping data up to date, resulting in excellent performance. The homepage is revalidated every 30 minutes while the stock page is revalidated every minute.

## License

STAWKS is licensed under [MIT](LICENSE).
