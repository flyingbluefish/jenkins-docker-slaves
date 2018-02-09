# jenkins-docker-slaves

This project aims to provide boilerplate and simple example in order to build up jenkins master-slaves cluster. 

## Jenkins over Docker example

This project contains various files such as Dockerfile or related files, 
which forms a practical Jenkins master-slave configuration over Docker.

## ssh settings

In order to work cluster well, ssh settings is important. ssh setting is difficult to understand and setup correctly.
These Dockerfiles contains several commands to setup ssh and sshd.


## Background

This project refers to "https://github.com/knjname/jenkins-docker-example".

The blog entry is http://knjname.hateblo.jp/entry/2014/05/03/190842 (In Japanese).

I had to struggle to work it well. Because this omits permission settings to have
master connect to slave via ssh. I hope this would help someone.



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


### setup plugin

  ssh-agent plugin is required
  ssh-credentials plugin is required.
  
### setup credential

  To setup credential, register authentication information on jenkins.
  Use root's .ssh directory.
  
## add slave

  Add slave node with using ssh-credential.

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


## Directoris

  Docker image contains directoris to mount external directory to save data. See dockerrun.sh (both master and slave)

### Master directories

```
/root/.ssh ssh key
/var/log/jenkins log directory
/var/lib/jenkins workspace directory
/usr/lib/jenkins 
```
jenkins works with root permission as root. 


### Slave directories

```
/home/jenkins is home directory to keep .ssh directory.
/var/lib/jenkins is mount point of workspace.
```

So at the beginning of job script, you had better changing directory to /var/lib/jenkins/workspace directly.
Don't use $HOME/workspace.














