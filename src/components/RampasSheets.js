import React, { useRef } from 'react';
import ActionSheet, {SheetManager} from "react-native-actions-sheet";
import RampasDisponibles from './RampasDisponibles';
import { useTheme } from 'react-native-paper';

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