import { useContextBridge } from '@react-three/drei';
import React from 'react';

export const CAROUSEL_SIZE = 7;

const CarouselContext = React.createContext();

function carouselIndexReducer(state, action) {
    switch (action.type) {
        case 'increment': {
            return {carouselIndex: state.carouselIndex < CAROUSEL_SIZE-1 ? state.carouselIndex + 1 : 0}
        }

        case 'decrement': {
            return {carouselIndex: state.carouselIndex > 0 ? state.carouselIndex - 1 : CAROUSEL_SIZE-1}
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function CarouselProvider({children}) {
    const [state, dispatch] = React.useReducer(carouselIndexReducer, {carouselIndex: 0})
    const value = {state, dispatch}
    
    return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>
}

function useCarousel() {
    const context = React.useContext(CarouselContext)
    
    if (context === undefined) {
      throw new Error('useCarousel must be used within a CarouselProvider')
    }
    return context
}

function useCarouselContextBridge()
{
    const ContextBridge = useContextBridge(CarouselContext);

    return ContextBridge;
}

export {CarouselProvider, useCarousel, useCarouselContextBridge};