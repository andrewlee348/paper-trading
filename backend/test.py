from pycoingecko import CoinGeckoAPI
from flask import Flask, jsonify
from flask_cors import CORS  # Import the CORS module
from flask_caching import Cache

app = Flask(__name__)
CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

cg = CoinGeckoAPI()


@app.route('/')
def hello():
    return jsonify(message='Hello, World!')


@app.route('/get_allcrypto')
@cache.cached(timeout=60)
def get_allcrypto():
    cached_data = cache.get('data')  # Attempt to fetch data from cache
    if cached_data is not None:
        return jsonify(cached_data)  # Return cached data if available

    try:
        data = cg.get_coins_markets(vs_currency='usd')[:10]
        cache.set('data', data)  # Store the API response in the cache
        return data, 200

    except Exception as e:
        return {'error': str(e)}, 500  # Handle exceptions


@app.route('/coins/<string:id>', methods=['GET'])
def get_coin_details(id):
    try:
        pageData = cg.get_coin_by_id(id)
        graphDataDay = cg.get_coin_market_chart_by_id(id, 'usd', 1)
        graphDataWeek = cg.get_coin_market_chart_by_id(id, 'usd', 7)
        graphDataMonth = cg.get_coin_market_chart_by_id(id, 'usd', 30, interval='daily')
        graphDataQuarter = cg.get_coin_market_chart_by_id(id, 'usd', 90, interval='daily')
        graphDataHalf = cg.get_coin_market_chart_by_id(id, 'usd', 180, interval='daily')
        graphDataYear = cg.get_coin_market_chart_by_id(id, 'usd', 365, interval='daily')
        pointsDataDay = {
            'data': list(map(lambda x: x, graphDataDay["prices"][:-1:3])),
            'name': 'dailyData',
        }
        pointsDataWeek = {
            'data': list(map(lambda x: x, graphDataWeek["prices"][:-1:4])),
            'name': 'weeklyData',
        }
        pointsDataMonth = {
            'data': list(map(lambda x: x, graphDataMonth["prices"][:-1])),
            'name': 'monthlyData',
        }
        graphDataQuarter = {
            'data': list(map(lambda x: x, graphDataQuarter["prices"][:-1])),
            'name': 'quarterlyData',
        }
        graphDataHalf = {
            'data': list(map(lambda x: x, graphDataHalf["prices"][:-1])),
            'name': 'halfData',
        }
        graphDataYear = {
            'data': list(map(lambda x: x, graphDataYear["prices"][:-1])),
            'name': 'yearlyData',
        }
        return [pageData, [pointsDataDay, pointsDataWeek, pointsDataMonth, graphDataQuarter, graphDataHalf, graphDataYear]], 200
    except Exception as e:
        return {'error': str(e)}, 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
