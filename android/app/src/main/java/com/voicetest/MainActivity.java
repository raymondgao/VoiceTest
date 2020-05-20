package com.voicetest;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "VoiceTest";
  }


  @Override
  protected void onCreate(Bundle state){
    super.onCreate(state);

    SharedPreferences preferences =
            PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
    //preferences.edit().putString("debug_http_host", "digital-seat-250614.ts.r.appspot.com:80").apply();
    preferences.edit().putString("debug_http_host", "10.4.5.15:8081").apply();
  }

}
