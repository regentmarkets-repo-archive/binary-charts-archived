
    module.exports = {
        getBarItemStyle: require('../../model/mixin/makeStyleMapper')(
            [
                ['fill', 'color'],
                ['stroke', 'barBorderColor'],
                ['lineWidth', 'barBorderWidth'],
                ['opacity'],
                ['shadowBlur'],
                ['shadowOffsetX'],
                ['shadowOffsetY'],
                ['shadowColor']
            ]
        )
    };
