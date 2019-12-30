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

#import "FBSDKShareMessengerMediaTemplateContent.h"

#ifdef COCOAPODS
#import <FBSDKCoreKit/FBSDKCoreKit+Internal.h>
#else
#import "FBSDKCoreKit+Internal.h"
#endif
#import "FBSDKHashtag.h"
#import "FBSDKShareConstants.h"
#import "FBSDKShareMessengerContentUtility.h"

static NSString *const kMediaTemplatePageIDKey = @"pageID";
static NSString *const kMediaTemplateMediaTypeKey = @"mediaType";
static NSString *const kMediaTemplateAttachmentIDKey = @"attachmentID";
static NSString *const kMediaTemplateMediaURLKey = @"mediaURL";
static NSString *const kMediaTemplateButtonKey = @"button";
static NSString *const kMediaTemplateUUIDKey = @"uuid";

static BOOL _URLHasFacebookDomain(NSURL *URL)
{
  NSString *urlHost = URL.host.lowercaseString;
  NSArray<NSString *> *pathComponents = URL.pathComponents;

  /**
   Check the following three different cases...
   1. Check if host is facebook.com, such as in 'https://facebok.com/test'
   2. Check if host is someprefix.facebook.com, such as in 'https://www.facebook.com/test'
   3. Check if host is null, but the first path component is facebook.com
   */
  return [urlHost isEqualToString:@"facebook.com"] ||
  [urlHost hasSuffix:@".facebook.com"] ||
  ([pathComponents.firstObject.lowercaseString hasSuffix:@"facebook.com"]);
}

static NSString *_MediaTemplateURLSerializationKey(NSURL *mediaURL)
{
  if (_URLHasFacebookDomain(mediaURL)) {
    return @"facebook_media_url";
  } else {
    return @"image_url";
  }
}

DEPRECATED_FOR_MESSENGER
static NSString *_MediaTypeString(FBSDKShareMessengerMediaTemplateMediaType mediaType)
{
  switch (mediaType) {
    case FBSDKShareMessengerMediaTemplateMediaTypeImage:
      return @"image";
    case FBSDKShareMessengerMediaTemplateMediaTypeVideo:
      return @"video";
  }
}

DEPRECATED_FOR_MESSENGER
static NSArray<NSDictionary<NSString *, id> *> *_SerializableMediaTemplateContentFromContent(FBSDKShareMessengerMediaTemplateContent *mediaTemplateContent)
{
  NSMutableArray<NSDictionary<NSString *, id> *> *serializableMediaTemplateContent = [NSMutableArray array];

  NSMutableDictionary<NSString *, id> *mediaTemplateContentDictionary = [NSMutableDictionary dictionary];
  [FBSDKBasicUtility dictionary:mediaTemplateContentDictionary setObject:_MediaTypeString(mediaTemplateContent.mediaType) forKey:@"media_type"];
  [FBSDKBasicUtility dictionary:mediaTemplateContentDictionary setObject:mediaTemplateContent.mediaURL.absoluteString forKey:@"url"];
  [FBSDKBasicUtility dictionary:mediaTemplateContentDictionary setObject:mediaTemplateContent.attachmentID forKey:@"attachment_id"];
  [FBSDKBasicUtility dictionary:mediaTemplateContentDictionary setObject:SerializableButtonsFromButton(mediaTemplateContent.button) forKey:kFBSDKShareMessengerButtonsKey];
  [serializableMediaTemplateContent addObject:mediaTemplateContentDictionary];

  return serializableMediaTemplateContent;
}

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-implementations"
@implementation FBSDKShareMessengerMediaTemplateContent
#pragma clang diagnostic pop

#pragma mark - Properties

@synthesize contentURL = _contentURL;
@synthesize hashtag = _hashtag;
@synthesize peopleIDs = _peopleIDs;
@synthesize placeID = _placeID;
@synthesize ref = _ref;
@synthesize pageID = _pageID;
@synthesize shareUUID = _shareUUID;

#pragma mark - Initializer

- (instancetype)initWithAttachmentID:(NSString *)attachmentID
{
  self = [super init];
  if (self) {
    _attachmentID = [attachmentID copy];
    _shareUUID = [NSUUID UUID].UUIDString;
  }
  return self;
}

- (instancetype)initWithMediaURL:(NSURL *)mediaURL
{
  self = [super init];
  if (self) {
    _mediaURL = [mediaURL copy];
    _shareUUID = [NSUUID UUID].UUIDString;
  }
  return self;
}

#pragma mark - FBSDKSharingContent

- (NSDictionary<NSString *, id> *)addParameters:(NSDictionary<NSString *, id> *)existingParameters
                                  bridgeOptions:(FBSDKShareBridgeOptions)bridgeOptions
{
  NSMutableDictionary<NSString *, id> *updatedParameters = [NSMutableDictionary dictionaryWithDictionary:existingParameters];

  NSMutableDictionary<NSString *, id> *payload = [NSMutableDictionary dictionary];
  payload[kFBSDKShareMessengerTemplateTypeKey] = @"media";
  payload[kFBSDKShareMessengerElementsKey] = _SerializableMediaTemplateContentFromContent(self);

  NSMutableDictionary<NSString *, id> *attachment = [NSMutableDictionary dictionary];
  attachment[kFBSDKShareMessengerTypeKey] = kFBSDKShareMessengerTemplateKey;
  attachment[kFBSDKShareMessengerPayloadKey] = payload;

  NSMutableDictionary<NSString *, id> *contentForShare = [NSMutableDictionary dictionary];
  contentForShare[kFBSDKShareMessengerAttachmentKey] = attachment;

  NSMutableDictionary<NSString *, id> *contentForPreview = [NSMutableDictionary dictionary];
  [FBSDKBasicUtility dictionary:contentForPreview setObject:@"DEFAULT" forKey:@"preview_type"];
  [FBSDKBasicUtility dictionary:contentForPreview setObject:_attachmentID forKey:@"attachment_id"];
  [FBSDKBasicUtility dictionary:contentForPreview
                      setObject:_mediaURL.absoluteString
                         forKey:_MediaTemplateURLSerializationKey(_mediaURL)];
  [FBSDKBasicUtility dictionary:contentForPreview setObject:_MediaTypeString(_mediaType) forKey:@"media_type"];
  AddToContentPreviewDictionaryForButton(contentForPreview, _button);

  [FBSDKShareMessengerContentUtility addToParameters:updatedParameters contentForShare:contentForShare contentForPreview:contentForPreview];

  return updatedParameters;
}

#pragma mark - FBSDKSharingValidation

- (BOOL)validateWithOptions:(FBSDKShareBridgeOptions)bridgeOptions error:(NSError *__autoreleasing *)errorRef
{
  if (!_mediaURL && !_attachmentID) {
    if (errorRef != NULL) {
      *errorRef = [FBSDKError requiredArgumentErrorWithDomain:FBSDKShareErrorDomain
                                                         name:@"attachmentID/mediaURL"
                                                      message:@"Must specify either attachmentID or mediaURL"];
    }
    return NO;
  }
  return [FBSDKShareMessengerContentUtility validateMessengerActionButton:_button
                                                    isDefaultActionButton:NO
                                                                   pageID:_pageID
                                                                    error:errorRef];
}

#pragma mark - NSCoding

+ (BOOL)supportsSecureCoding
{
  return YES;
}

- (instancetype)initWithCoder:(NSCoder *)decoder
{
  if (self = [self initWithAttachmentID:@""]) {
    _pageID = [decoder decodeObjectOfClass:[NSString class] forKey:kMediaTemplatePageIDKey];
    _mediaType = [[decoder decodeObjectForKey:kMediaTemplateMediaTypeKey] unsignedIntegerValue];
    _attachmentID = [decoder decodeObjectOfClass:[NSString class] forKey:kMediaTemplateAttachmentIDKey];
    _mediaURL = [decoder decodeObjectOfClass:[NSURL class] forKey:kMediaTemplateMediaURLKey];
    _button = [decoder decodeObjectForKey:kMediaTemplateButtonKey];
    _shareUUID = [decoder decodeObjectOfClass:[NSString class] forKey:kMediaTemplateUUIDKey];
  }
  return self;
}

- (void)encodeWithCoder:(NSCoder *)encoder
{
  [encoder encodeObject:_pageID forKey:kMediaTemplatePageIDKey];
  [encoder encodeObject:@(_mediaType) forKey:kMediaTemplateMediaTypeKey];
  [encoder encodeObject:_attachmentID forKey:kMediaTemplateAttachmentIDKey];
  [encoder encodeObject:_mediaURL forKey:kMediaTemplateMediaURLKey];
  [encoder encodeObject:_button forKey:kMediaTemplateButtonKey];
  [encoder encodeObject:_shareUUID forKey:kMediaTemplateUUIDKey];
}

#pragma mark - NSCopying

- (id)copyWithZone:(NSZone *)zone
{
  FBSDKShareMessengerMediaTemplateContent *copy =
   [[FBSDKShareMessengerMediaTemplateContent alloc] initWithAttachmentID:@""];
  copy->_pageID = [_pageID copy];
  copy->_mediaType = _mediaType;
  copy->_attachmentID = [_attachmentID copy];
  copy->_mediaURL = [_mediaURL copy];
  copy->_button = [_button copy];
  copy->_shareUUID = [_shareUUID copy];
  return copy;
}

@end
