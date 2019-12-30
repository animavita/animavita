// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
//
// You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
// copy, modify, and distribute this software in source code or binary form for use
// in connection with the web services and APIs provided by Facebook.
//
// As with any software that integrates with the Facebook platform, your use of
// this software is subject to the Facebook Developer Principles and Policies
// [http://developers.facebook.com/policy/]. This copyright notice shall be
// included in all copies or substantial portions of the software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/**
 FBSDKFeature enum
 Defines features in SDK

 Sample:
 FBSDKFeatureAppEvents = 0x000100,
                            ^ ^ ^
                            | | |
                          kit | |
                        feature |
                      sub-feature
 1st byte: kit
 2nd byte: feature
 3rd byte: sub-feature
 */
typedef NS_ENUM(NSUInteger, FBSDKFeature)
{
  // Features in CoreKit
  /** Essential of CoreKit */
  FBSDKFeatureCore = 0x000000,

  FBSDKFeatureAppEvents = 0x000100,
  FBSDKFeatureCodelessEvents,
  FBSDKFeatureRestrictiveDataFiltering,
  FBSDKFeatureInstrument = 0x000200,
  FBSDKFeatureCrashReport,
  FBSDKFeatureErrorReport,


  // Features in LoginKit
  /** Essential of LoginKit */
  FBSDKFeatureLogin = 0x010000,

  // Features in ShareKit
  /** Essential of ShareKit */
  FBDSDKFeatureShare = 0x020000,

  // Features in PlacesKit
  /** Essential of PlacesKit */
  FBSDKFeaturePlaces = 0x030000,

} NS_SWIFT_NAME(SDKFeature);

typedef void (^FBSDKFeatureManagerBlock)(BOOL enabled);

@interface FBSDKFeatureManager : NSObject

+ (void)checkFeature:(FBSDKFeature)feature
     completionBlock:(FBSDKFeatureManagerBlock)completionBlock;

@end

NS_ASSUME_NONNULL_END
