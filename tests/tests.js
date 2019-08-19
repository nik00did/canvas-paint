

describe('Tests for canvas painting', () => {
    const testData = [
        // {
        //     handledValue: {color: "#000000", width: "3", startX: 200, startY: 20, endX: 200, endY: 20},
        //     expected: {color: "#000000", width: "3", startX: 200, startY: 20, endX: 200, endY: 20}
        // },
        {
            handledValue: {color: "#000000", width: "3", startX: 10, startY: 0, endX: 200, endY: 20},
            expected: {color: "#000000", width: "3", startX: 10, startY: 0, endX: 200, endY: 20}
        },
        {
            handledValue: {color: "#000000", width: "3", startX: 0, startY: 10, endX: 200, endY: 20},
            expected: {color: "#000000", width: "3", startX: 0, startY: 10, endX: 200, endY: 20}
        },

    ];

    testData.forEach(data => {
        const {handledValue, expected} = data;

        const actual = setModelNumberValue(handledValue);
        it(`if we paint a broken line with xStart = ${handledValue.startX} yStart = ${handledValue.startY} it should return startX = ${expected.startX} startY = ${expected.startY} endX = ${expected.endX} endY = ${expected.endY}` , () => {
            assert.deepEqual(actual, expected);
        });
    });
})
