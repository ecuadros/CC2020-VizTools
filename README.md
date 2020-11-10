# CC2020-VizTools
Computing Curricula Vizualization Tools


# Setup

## Requirements

* Node: 13+
* Angular CLI 10+
* Java JDK 11+
* Maven 3.6+
* PostgreSQL 12.3+

## Constant

Set encryption key in [backend constants](https://github.com/ecuadros/CC2020-VizTools/blob/master/backend/src/main/java/security/Constants.java#L5)

```java
public static final String SIGNING_KEY = **key**;
```

Set PostgreSQL credentials in [application.properties](https://github.com/ecuadros/CC2020-VizTools/blob/master/backend/src/main/esources/application.properties#L6-L8)

```properties
spring.datasource.url = **url**
spring.datasource.username = **username**
spring.datasource.password = **password**
```

## Test

Run backend with maven:

```sh
$ mvn spring-boot:run
```

Run frontend with node:

```sh
$ ng serve
```
