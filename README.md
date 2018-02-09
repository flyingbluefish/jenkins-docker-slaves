# jenkins-docker-slaves

This project refers to "https://github.com/knjname/jenkins-docker-example".
   blog entry http://knjname.hateblo.jp/entry/2014/05/03/190842 (In Japanese).

I had to struggle to work well. Because this omits permission settings to have
ssh work well. I hope this would help someone.

# Jenkins over Docker example

This project contains various files such as Dockerfile or related files, 
which forms a practical Jenkins master-slave configuration over Docker.


## To build Jenkins master node

```
#> cd master
#> make
(An image ci/master will be registered.)
```

### And to run

Modify dockerrun.sh to setup directories.

```
#> cd master
#> bash dockerrun.sh
```

Access to http://`address`:8880/ to execute jenkins.


## To build Jenkins slave node

```
#> cd slave
#> make
(An image ci/slave will be registered.)
```

### And to run

```
#> cd slave
#> bash dockerrun.sh
```

On slave node, sshd listens to your_host:11022 .  (11022->22)

To connect between the master and the slave, you have to configure it manually 
via Jenkins administration menu.

- via ssh and specify port(11022) to connect to slave.




