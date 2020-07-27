import { ResponsiveProvider, withIsMobile } from '../src';
import { breakpoints, breakpointsMax } from './__fixtures__/mockBreakpoints';
import { cleanup, render } from '@testing-library/react';
import {
    mockMatchMedia,
    unmockMatchMedia,
} from './__fixtures__/mockMatchMedia';
import React from 'react';

const mockProps = { breakpoints, breakpointsMax };

describe('withIsMobile()', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockMatchMedia();
    });

    afterEach(() => {
        cleanup();
        unmockMatchMedia();
    });

    test('should render correctly', () => {
        window.resizeTo(1024, 768);
        const MockComponent = jest.fn(() => <h1>Mock test</h1>);
        const MockComponentWithIsMobile = withIsMobile(MockComponent);

        const { asFragment } = render(
            <ResponsiveProvider {...mockProps}>
                <MockComponentWithIsMobile />
            </ResponsiveProvider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test('should pass the values to the `isMobile` and `isCalculated` props correctly', () => {
        window.resizeTo(959, 768);
        const MockComponent = jest.fn(() => <h1>Mock test</h1>);
        const MockComponentWithIsMobile = withIsMobile(MockComponent);

        render(
            <ResponsiveProvider {...mockProps}>
                <MockComponentWithIsMobile />
            </ResponsiveProvider>
        );

        expect(MockComponent).toHaveBeenLastCalledWith(
            {
                isMobile: true,
                isCalculated: true,
            },
            {}
        );
    });

    test('should pass the values to the `isMobile` and `isCalculated` props correctly and the additional props correctly', () => {
        window.resizeTo(959, 768);
        const MockComponent = jest.fn(() => <h1>Mock test</h1>);
        const MockComponentWithIsMobile = withIsMobile(MockComponent);

        render(
            <ResponsiveProvider {...mockProps}>
                <MockComponentWithIsMobile test={'hello'} myProp={'world'} />
            </ResponsiveProvider>
        );

        expect(MockComponent).toHaveBeenLastCalledWith(
            {
                isMobile: true,
                isCalculated: true,
                test: 'hello',
                myProp: 'world',
            },
            {}
        );
    });
});
