import React, { useRef } from 'react';
import ActionSheet, {SheetManager} from "react-native-actions-sheet";
import { useTheme } from 'react-native-paper';

import RampasDisponibles from './RampasDisponibles';

const RampasSheets = () =>{

    const actionSheetRef = useRef(null);
    const theme = useTheme()
    return( 
        <>

          <ActionSheet
            initialOffsetFromBottom={0.4}
            id='rampas_bottom_sheet'
            ref={actionSheetRef}
            statusBarTranslucent
            bounceOnOpen={true}
            drawUnderStatusBar={true}
            bounciness={8}
            gestureEnabled={true}
            defaultOverlayOpacity={0.3}
            containerStyle ={{backgroundColor:theme.colors.background}} 
            indicatorColor={theme.colors.secondary}>
          
            <RampasDisponibles/>
          </ActionSheet>
      </>
    );
  };

export default RampasSheets;