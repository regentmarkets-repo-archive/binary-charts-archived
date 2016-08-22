export default ({ typeChange }) => {
    if (!typeChange) return { enabled: false };

    return {
        buttons: {
            contextButton: {
                enabled: false,
            },
            tickButton: {
                symbol: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IndpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggY2xhc3M9InN0MCIgZD0iTTE5LjUsMC41Yy0wLjEsMC0wLjIsMC0wLjMsMC4xTDE1LDMuOUwxMCwzQzkuOSwzLDkuOCwzLDkuNywzLjFMNC42LDYuNkwwLjUsNS41QzAuMyw1LjQsMCw1LjYtMC4xLDUuOHYwLjF2Ni40djYuOGMwLDAuMywwLjIsMC41LDAuNSwwLjVoMTkuMWMwLjMsMCwwLjUtMC4yLDAuNS0wLjVWOC45di04QzIwLDAuNywyMCwwLjUsMTkuNSwwLjVMMTkuNSwwLjV6IE0xOS4yLDEuOXY1LjNjMCwwLDAsMC0wLjEsMGwtMy45LDMuM2wtNS0wLjljLTAuMSwwLTAuMiwwLTAuMywwLjFMNC44LDEzTDEsMTIuMlY2LjVsMy44LDFjMC4xLDAsMC4zLDAsMC40LTAuMWw1LjEtMy41bDUsMC45YzAuMSwwLDAuMywwLDAuNC0wLjFMMTkuMiwxLjl6IE0xOS4yLDguM3YwLjZ2OS44SDFWMTNsMy44LDAuOGMwLjEsMCwwLjIsMCwwLjMtMC4xbDUuMS0zLjNsNSwwLjljMC4xLDAsMC4zLDAsMC40LTAuMUwxOS4yLDguM3oiLz48L3N2Zz4=)', // eslint-disable-line max-len
                onclick: function changeToTick() {                      // eslint-disable-line object-shorthand
                    const chart = this;
                    if (chart.isLoading) {
                        return;
                    }
                    const result = typeChange('area');
                    if (result && result.then) {    // show loading msg if typechange function return promise
                        chart.showLoading();
                        result.then(() => chart.hideLoading());
                    }
                },
                y: 7,
            },
            ohlcButton: {
                symbol: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IndpZHRoPSIyMHB4IiBoZWlnaHQ9IjIwcHgiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTIuNCwwLjRIMS42djQuNEgwdjguOGgxLjZ2NmgwLjh2LTZINFY0LjhIMi40VjAuNHogTTMuMiwxMi44SDAuOFY1LjZoMi40VjEyLjh6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTEwLjQsMC40SDkuNnY5LjJIOHY3LjJoMS42djIuOGgwLjh2LTIuOEgxMlY5LjZoLTEuNlYwLjR6IE0xMS4yLDE2SDguOHYtNS42aDIuNFYxNnoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAsMy4yaC0xLjZWMC40aC0wLjh2Mi44SDE2djEzLjZoMS42djIuOGgwLjh2LTIuOEgyMFYzLjJ6IE0xOS4yLDE2aC0yLjRWNGgyLjRWMTZ6Ii8+PC9nPjwvc3ZnPg==)', // eslint-disable-line max-len
                onclick: function changeToOHLC() {                      // eslint-disable-line object-shorthand
                    const chart = this;
                    if (chart.isLoading) {
                        return;
                    }
                    const result = typeChange('candlestick');
                    if (result && result.then) {
                        chart.showLoading();
                        result.then(() => chart.hideLoading());
                    }
                },
                y: 7,
            },
        },
    };
};
